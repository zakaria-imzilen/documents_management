import React from "react"
import { Button } from "antd"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            <Button type="primary">Primary Button</Button>
            <Outlet />
        </div>
    )
}

export default Layout