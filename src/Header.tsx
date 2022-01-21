import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Button, Menu, Row } from 'antd'
import { GoogleOutlined, HomeOutlined } from '@ant-design/icons'

interface Props {
  siteTitle: string
}

export class Header extends Component<Props> {
  render() {
    const { siteTitle } = this.props
    return (
      <Row>
        <Menu mode="horizontal">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="https://www.amaterasu-sec.com">
              {siteTitle}
            </Link>
          </Menu.Item>
          <Menu.Item icon={<GoogleOutlined />}>
            <a
              href="https://drive.google.com/drive/u/0/folders/0AO4GkdxNwv-DUk9PVA"
              target="_blank"
            >
              Pen Test Reports
            </a>
          </Menu.Item>
        </Menu>
      </Row>
    )
  }
}
