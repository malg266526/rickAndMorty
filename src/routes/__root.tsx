import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {Menu} from "../components/menu/Menu.tsx";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
      <React.Fragment>
          <Menu />

          <Outlet/>
          <TanStackRouterDevtools />
      </React.Fragment>
  )
}
