import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Removing adapter to have full manual control over user/account creation and linking
  // which avoids issues with non-standard schema or missing tables
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "placeholder",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "placeholder",
      authorization: {
        params: {
          scope: "email,public_profile,instagram_basic,instagram_manage_insights,pages_read_engagement,pages_show_list,pages_manage_posts"
        }
      }
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "placeholder",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "placeholder",
      version: "2.0",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "placeholder",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "placeholder",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !user) return true;

      if (account.provider !== "credentials") {
        const platform = account.provider.toUpperCase() as any;
        
        // Manual account linking logic
        // If we have an email from the social provider, try to find the user
        let targetUser = await db.user.findUnique({
          where: { email: user.email || "" }
        });

        // If user doesn't exist, we might create them or fail if this is a "connect only" flow
        // For this project, social providers can also be used for login
        if (!targetUser) {
          targetUser = await db.user.create({
            data: {
              email: user.email || `${account.provider}_${account.providerAccountId}@placeholder.com`,
              name: user.name || (profile as any)?.username || "User",
              image: user.image,
            }
          });
        }

        // Link/Update the SocialAccount
        const existingSocialAccount = await db.socialAccount.findFirst({
          where: {
            platform: platform,
            userId: targetUser.id
          }
        });

        const socialData = {
          platform,
          userId: targetUser.id,
          accessToken: account.access_token || "",
          refreshToken: account.refresh_token || null,
          username: (profile as any)?.username || (profile as any)?.name || user.name || "Unknown",
          profileUrl: (profile as any)?.link || null,
        };

        if (existingSocialAccount) {
          await db.socialAccount.update({
            where: { id: existingSocialAccount.id },
            data: {
              accessToken: socialData.accessToken,
              refreshToken: socialData.refreshToken,
              updatedAt: new Date()
            }
          });
        } else {
          // Get or create organization
          let orgId = targetUser.orgId;
          if (!orgId) {
            const org = await db.organization.create({
              data: { name: `${targetUser.name}'s Workspace` }
            });
            orgId = org.id;
            await db.user.update({
              where: { id: targetUser.id },
              data: { orgId }
            });
          }

          await db.socialAccount.create({
            data: {
              ...socialData,
              orgId: orgId!
            }
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).orgId = token.orgId;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.orgId = (user as any).orgId;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
