import React, { useContext, useState, FunctionComponent } from 'react'
import styled from 'styled-components'
import { LoginButton } from '../login/LoginButton'
import { UserContext, UserContextProps } from '../../stores/UserStore'
import { Link } from 'react-router-dom'
import { device } from '../../styles/device'
import { basicTheme } from '../../styles/basic-theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const HeaderStyle = styled.header`
  a {
    text-decoration: none;
    color: ${basicTheme.fontColors.main};
    &:hover {
      opacity: 0.3;
    }
  }

  background: #ffffff;
  padding-right: 15px;
  padding-left: 15px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  min-height: 55px;
  align-items: center;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  z-index: 10;
  margin-bottom: 10px;

  @media ${device.tablet} {
    flex-direction: column;
    min-height: 40px;

    &.active {
      .header__item {
        .menu {
          display: block !important;
        }
      }
    }
  }

  .header__item {
    display: flex;
    align-items: center;

    @media ${device.tablet} {
      flex-direction: column;
      width: 100vw;
      .menu {
        margin-top: 10px;
        margin-bottom: 10px;
        display: none !important;
      }

      .logo {
        display: block !important;
      }

      &.active {
        display: block;
      }
    }
    .bars-icon {
      border: none;
      background: inherit;
      position: absolute;
      top: 10px;
      left: 10px;
      display: none;
      @media ${device.tablet} {
        display: block;
      }
    }
  }
  .left {
    width: 350px;
    @media ${device.tablet} {
      width: 100vw;
    }

    .logo {
      display: flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
    }

    .search-bar {
      @media ${device.tablet} {
        flex-direction: row;
        max-width: 100vw;
      }
      position: relative;
      height: 30px;
      border: 1px solid black;
      display: flex;
      justify-content: space-between;
      border-radius: 5px;
      overflow: hidden;
      width: calc(100% - 2rem);
      input {
        width: 100%;
        height: 100%;
        border: none;
        box-sizing: border-box;
      }
      .search-button {
        width: 50px;
        height: 100%;
        border: none;
        position: absolute;
        top: 0;
        right: 0;
        color: ${basicTheme.fontColors.sub_dark};
        &.active {
          background: ${basicTheme.bgColors.allow};
          color: ${basicTheme.fontColors.white};
        }
      }
    }
  }

  .right {
    .login-menu {
      .login-menu__icon {
        display: none;
      }
      @media ${device.tablet} {
        display: block;
        order: 2;
      }
    }
    .profile-img {
      padding-left: 10px;
      padding-right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      boder: 1px solid black;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`

const BurgerBar = styled.div`
  &.active {
    .bar-1 {
      transform: rotate(-30deg) translate(-4px, 5px);
    }
    .bar-2 {
      opacity: 0;
    }
    .bar-3 {
      transform: rotate(30deg) translate(-3px, -4px);
    }
  }
  .bar-1,
  .bar-2,
  .bar-3 {
    width: 24px;
    height: 3px;
    background: #333;
    margin: 3px 0;
    transition: 0.4s;
  }
`
export interface HeaderProps {
  handleSearch: Function
}

export const Header: FunctionComponent<HeaderProps> = ({ handleSearch }) => {
  const { user, logout }: UserContextProps = useContext(UserContext)

  const [searchBarAcitve, changeSearchBarActive] = useState(false)

  const [barMenuActive, changeBarMenuState] = useState(false)

  const [searchText, setSearchText] = useState('')

  const onClickSearchBar = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    changeSearchBarActive(true)
  }

  const onKeyDownSearchBtn = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const onSearch = () => {
    handleSearch(searchText)
  }

  document.body.addEventListener('click', () => {
    searchBarAcitve && changeSearchBarActive(false)
  })

  return (
    <HeaderStyle className={`${barMenuActive && 'active'}`}>
      <div className="header__item left">
        <button
          className="bars-icon"
          onClick={e => changeBarMenuState(!barMenuActive)}
        >
          <BurgerBar className={`bars ${barMenuActive && 'active'}`}>
            <div className="bar-1"></div>
            <div className="bar-2"></div>
            <div className="bar-3"></div>
          </BurgerBar>
        </button>
        <Link to="/">
          <div className="logo menu">HOME</div>
        </Link>
        <div
          className={`header__item search-bar menu `}
          onClick={onClickSearchBar}
        >
          <input
            type="text"
            onKeyDown={onKeyDownSearchBtn}
            onChange={e => setSearchText(e.target.value)}
          />
          <button
            className={`search-button ${searchBarAcitve && 'active'}`}
            onClick={onSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="header__item right">
        {user.id != null && (
          <div className={`profile-img menu `}>
            <Link to="/my-page">
              <img
                src={user.profile_url != null ? user.profile_url : '#'}
                alt=""
              />
            </Link>
          </div>
        )}
        <div
          className={`menu login-menu ${faBars}`}
          onClick={e => user.id != null && logout()}
        >
          <div className="login-menu__icon">
            {user != null ? (
              <FontAwesomeIcon icon={faSignOutAlt} />
            ) : (
              <FontAwesomeIcon icon={faSignInAlt} />
            )}
          </div>
          <div className="login-menu__btn">
            <LoginButton isLogined={user.id != null} logout={logout} />
          </div>
        </div>
      </div>
    </HeaderStyle>
  )
}
