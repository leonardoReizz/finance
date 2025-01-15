FROM node:20.12.1

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dGVuZGVyLWFwZS01LmNsZXJrLmFjY291bnRzLmRldiQ
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dGVuZGVyLWFwZS01LmNsZXJrLmFjY291bnRzLmRldiQ
ENV CLERK_SECRET_KEY=sk_test_htPtYSJd8KmP0RUhLfloVMNGH25F0xOKuvaUtopzvF
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ENV CLERK_PUBLISHABLE_KEY=pk_test_dGVuZGVyLWFwZS01LmNsZXJrLmFjY291bnRzLmRldiQ
ENV DATABASE_URL="postgresql://neondb_owner:rBob4LhGsiE7@ep-weathered-waterfall-a5rvpzz7.us-east-2.aws.neon.tech/neondb?sslmode=require"
ENV NEXT_PUBLIC_APP_URL="http://localhost:3000"


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
