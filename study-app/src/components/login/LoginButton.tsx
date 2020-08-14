import React, { useState, FunctionComponent } from 'react'
import { BasicModal } from '../../style-components/modal/BasicModal'
import { DefaultButton } from '../../style-components/button/DefaultButton'
import styled from 'styled-components'
import { basicTheme } from '../../styles/basic-theme'
import { LinkButton } from '../../style-components/button/LinkButton'

const ModalHeader = styled.header`
  padding: 10px;
  color: ${basicTheme.fontColors.main};
  border-bottom: 1px solid ${basicTheme.borderColors.main};
  font-weight: 900;
  position: relative;
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const ModalContent = styled.main`
  padding-top: 50px;
  padding-bottom: 50px;
`

const GithubLoginButton = styled.a`
  display: block;
  text-align: center;
  margin: auto;
  width: 90%;
  height: 50px;
  text-decoration: none;
  background: #ffffff;
  .wrapper {
    background: #333;
    border-radius: 5px;
  }
  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    .icon {
      display: flex;
      margin-right: 10px;
    }
  }
`

export const LoginButton = ({
  isLogined,
  logout
}: {
  isLogined: boolean
  logout: Function
}) => {
  const [joinModal, updateJoinModalStatus] = useState(false)

  const handleClickDeleteBtn = () => {
    updateJoinModalStatus(false)
  }

  const onClickOpenModalHandler = () => {
    updateJoinModalStatus(true)
  }

  return (
    <>
      {isLogined ? (
        <LinkButton onClickHandler={logout}>로그아웃</LinkButton>
      ) : (
        <LinkButton onClickHandler={onClickOpenModalHandler}>로그인</LinkButton>
      )}

      <BasicModal isOpen={joinModal} onClickDelete={handleClickDeleteBtn}>
        <ModalHeader>
          <div className="delete">
            <DefaultButton onClick={handleClickDeleteBtn} width={40}>
              X
            </DefaultButton>
          </div>
          <div className="title">로그인</div>
        </ModalHeader>
        <ModalContent>
          <GithubLoginButton
            href={`${process.env.REACT_APP_BASE_URL}/github-login`}
          >
            <div className="wrapper">
              <div className="items">
                <div className="icon">
                  <svg
                    // class="octicon octicon-mark-github v-align-middle"
                    fill="white"
                    height="32"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="32"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    ></path>
                  </svg>
                </div>
                <div className="text">GITHUB계정으로 로그인하기</div>
              </div>
            </div>
          </GithubLoginButton>
        </ModalContent>
      </BasicModal>
    </>
  )
}
