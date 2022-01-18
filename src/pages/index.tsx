import * as React from 'react'
import { Link } from 'gatsby'
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

const IndexPage = () => {
  return (
    <div align="center" style={{ padding: 80 }}>
      <p
        style={{
          color: 'red',
          fontSize: 50,
          fontWeight: 'bold',
        }}
      >
        Amaterasu Security
      </p>
      <h2>The great sun of the kami.</h2>
      <br />
      <Button.Group size="large">
        <Button
          size="large"
          icon={<GithubOutlined />}
          href="https://github.com/dr0pp3dpack3ts"
          target="_blank"
        >
          Github
        </Button>

        <Button type="primary" size="large">
          <Link to="/docs/write-ups/">Write-Ups</Link>
        </Button>
      </Button.Group>
    </div>
  )
}

export default IndexPage
