import { AppBar, Toolbar, Link } from "@mui/material";

import React from "react";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/task" color="inherit">
          タスク管理
        </Link>
      </Toolbar>
    </AppBar>
  );
}
