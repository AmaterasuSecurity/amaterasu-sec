import * as React from 'react'
import { Link } from 'gatsby'
import { Button } from 'antd'
import { GithubOutlined, LinkedinOutlined  } from '@ant-design/icons'
import writeups from '../../contents'
import amaterasu from '../static'



const IndexPage = () => {
  return (
    <div align="center" style={{ padding: 80 }}>
      <p
        style={{
          color: 'crimson',
          fontSize: 50,
          fontWeight: 'bold',
        }}
      >
        Amaterasu Security 

       const static = () => (
         <div>
           <img src={amaterasu} className={static.amaterasu} />
         </div>
       )

      </p>
      <h2>The great sun of the kami.</h2>
    
      <br />
      <Button.Group size="large">
        <Button
          size="large"
          icon={<LinkedinOutlined />}
          href="https://linkedin.com/in/alvinl-li"
          target="_blank"
        >
          LinkedIn
        </Button>
        
        <Button
          size="large"
          icon={<GithubOutlined />}
          href="https://github.com/dr0pp3dpack3ts"
          target="_blank"
        >
          Github
        </Button>

        <Button type="primary" size="large">
          <Link to="/docs/writeups/">Write-Ups</Link>
        </Button>
      </Button.Group>
    </div>
  )
}

export default IndexPage
