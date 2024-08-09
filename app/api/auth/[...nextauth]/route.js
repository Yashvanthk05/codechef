// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from './../../../../models/user';
import { connectToDB } from './../../../../utils/database';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectToDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user; 
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Failed to authenticate');
        }
      },
    }),
  ], 
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.username = user.username;
        token.id = user.id;
        token.message = user.message
      }
      console.log(token);
      return token;
    },
    async session({session,token}){
      if(token){
        session.user.username=token.username;
        session.user.id = token.id;
        session.message=token.message;
      }
      console.log(session);
      return session
    }
  }
};

const handler = NextAuth(authOptions);

export {handler as GET,handler as POST}