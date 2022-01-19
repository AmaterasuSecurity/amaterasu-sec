import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Button, Menu, Row } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

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
            <Link to="https://www.amaterasu-sec.com">
              {siteTitle}
            </Link>
          </Menu.Item>
          <Menu.Item icon={<GithubOutlined />}>
            <a
              href="https://github.com/dr0pp3dpack3ts"
              target="_blank"
            >
              GitHub
            </a>
          </Menu.Item>
        </Menu>
      </Row>
    )
  }
}
