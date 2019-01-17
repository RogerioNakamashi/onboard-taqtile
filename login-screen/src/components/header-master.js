import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

class HeaderMaster extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Menu fixed='top' inverted color='blue' pointing size='large'>
        <Link to='/izi-serv'>
          <Menu.Item
            name='home'
            active={true}
          />
        </Link>
        <Link to='/projetos'>
          <Menu.Item
            name='projetos'
            active={false}
          />
        </Link>
        <Link to='/servicos'>
          <Menu.Item
            name='Serviços'
            active={false}
          />
        </Link>
        <Link to='/integradores'>
          <Menu.Item
            name='integradores'
            active={false}
          />
        </Link>
        <Link to='/prestadores'>
          <Menu.Item
            name='prestadores'
            active={false}
          />
        </Link>
        <Menu.Menu position='right'>
          <Link to='/minha-conta'>
            <Menu.Item
              name='minha conta'
              active={false}
            />
          </Link>
          <Link to='/login'>
            <Menu.Item
              name='Login'
              active={false}
            />
          </Link>
          <Link to='/cadastro'>
            <Menu.Item
              name='Cadastro'
              active={false}
            />
          </Link>
        </Menu.Menu>
      </Menu>
      
      </BrowserRouter>
    )
  }
}

export default HeaderMaster;
