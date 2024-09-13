/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as VerifyEmailImport } from './routes/verify-email'
import { Route as SignupImport } from './routes/signup'
import { Route as SigninImport } from './routes/signin'
import { Route as ResetPasswordImport } from './routes/reset-password'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as NewPasswordTokenImport } from './routes/new-password.$token'
import { Route as AuthFeedbackImport } from './routes/_auth.feedback'

// Create/Update Routes

const VerifyEmailRoute = VerifyEmailImport.update({
  path: '/verify-email',
  getParentRoute: () => rootRoute,
} as any)

const SignupRoute = SignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const SigninRoute = SigninImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const ResetPasswordRoute = ResetPasswordImport.update({
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const NewPasswordTokenRoute = NewPasswordTokenImport.update({
  path: '/new-password/$token',
  getParentRoute: () => rootRoute,
} as any)

const AuthFeedbackRoute = AuthFeedbackImport.update({
  path: '/feedback',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/verify-email': {
      id: '/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof VerifyEmailImport
      parentRoute: typeof rootRoute
    }
    '/_auth/feedback': {
      id: '/_auth/feedback'
      path: '/feedback'
      fullPath: '/feedback'
      preLoaderRoute: typeof AuthFeedbackImport
      parentRoute: typeof AuthImport
    }
    '/new-password/$token': {
      id: '/new-password/$token'
      path: '/new-password/$token'
      fullPath: '/new-password/$token'
      preLoaderRoute: typeof NewPasswordTokenImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthFeedbackRoute: typeof AuthFeedbackRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthFeedbackRoute: AuthFeedbackRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/reset-password': typeof ResetPasswordRoute
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/feedback': typeof AuthFeedbackRoute
  '/new-password/$token': typeof NewPasswordTokenRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/reset-password': typeof ResetPasswordRoute
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/feedback': typeof AuthFeedbackRoute
  '/new-password/$token': typeof NewPasswordTokenRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/reset-password': typeof ResetPasswordRoute
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/_auth/feedback': typeof AuthFeedbackRoute
  '/new-password/$token': typeof NewPasswordTokenRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/reset-password'
    | '/signin'
    | '/signup'
    | '/verify-email'
    | '/feedback'
    | '/new-password/$token'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/reset-password'
    | '/signin'
    | '/signup'
    | '/verify-email'
    | '/feedback'
    | '/new-password/$token'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/reset-password'
    | '/signin'
    | '/signup'
    | '/verify-email'
    | '/_auth/feedback'
    | '/new-password/$token'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  ResetPasswordRoute: typeof ResetPasswordRoute
  SigninRoute: typeof SigninRoute
  SignupRoute: typeof SignupRoute
  VerifyEmailRoute: typeof VerifyEmailRoute
  NewPasswordTokenRoute: typeof NewPasswordTokenRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  ResetPasswordRoute: ResetPasswordRoute,
  SigninRoute: SigninRoute,
  SignupRoute: SignupRoute,
  VerifyEmailRoute: VerifyEmailRoute,
  NewPasswordTokenRoute: NewPasswordTokenRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/reset-password",
        "/signin",
        "/signup",
        "/verify-email",
        "/new-password/$token"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/feedback"
      ]
    },
    "/reset-password": {
      "filePath": "reset-password.tsx"
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/verify-email": {
      "filePath": "verify-email.tsx"
    },
    "/_auth/feedback": {
      "filePath": "_auth.feedback.tsx",
      "parent": "/_auth"
    },
    "/new-password/$token": {
      "filePath": "new-password.$token.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
