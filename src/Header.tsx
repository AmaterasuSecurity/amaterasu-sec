import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Button, Menu, Row } from 'antd'
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'

interface Props {
  siteTitle: string
}

export class Header extends Component<Props> {
  render() {
    const { siteTitle } = this.props
    return (
      <Row>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link to="/docs/write-ups">
              {siteTitle}
            </Link>
          </Menu.Item>
          <Menu.Item icon={<GithubOutlined />}>
            <a
              href="https://github.com/dr0pp3dpack3ts"
              target="_blank"
            >
              GitHub
        
          </Menu.Item>
        </Menu>
      </Row>
    )
  }
}
