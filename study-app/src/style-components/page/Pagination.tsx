import React, { FunctionComponent } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { device } from '../../styles/device'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons'
import { basicTheme } from '../../styles/basic-theme'

interface PageProps {
  handleClickPage: Function
  currentPage: number
  totalPage: number
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 0 !important;
    border: none;
    background: inherit;
  }
  .controller {
    text-align: center;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
  }
`
const NumbersWrapper = styled.div`
  position: relative;
  overflow: hidden;
`
interface NumbersStyleProps {
  mobileSX: number
  mobileLX: number
  tabletX: number
  mobileSMaxWidth: number
  mobileLMaxWidth: number
  tabletMaxWidth: number
  pcMaxWidth: number
  pcX: number
}

const NumbersStyle = styled.div<NumbersStyleProps>`
  display: flex;
  max-width: ${(props: NumbersStyleProps) => props.pcMaxWidth}px;
  transform: translateX(${(props: NumbersStyleProps) => props.pcX}px);

  @media ${device.tablet} {
    max-width: ${(props: NumbersStyleProps) => props.tabletMaxWidth}px;
    transform: translateX(${(props: NumbersStyleProps) => props.tabletX}px);
  }
  @media ${device.mobileL} {
    max-width: ${(props: NumbersStyleProps) => props.mobileLMaxWidth}px;
    transform: translateX(${(props: NumbersStyleProps) => props.mobileLX}px);
  }

  @media ${device.mobileS} {
    max-width: ${(props: NumbersStyleProps) => props.mobileSMaxWidth}px;
    transform: translateX(${(props: NumbersStyleProps) => props.mobileSX}px);
  }
`

const NumberStyle = styled.button`
  min-width: 35px;
  height: 35px;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
  padding: 0;
  margin: 0;
  &.active {
    border: 1px solid ${basicTheme.bgColors.allow};
    border-radius: 50%;
    background: ${basicTheme.bgColors.allow};
    color: ${basicTheme.fontColors.white};
  }
`

export const Pagingation: FunctionComponent<PageProps> = ({
  handleClickPage,
  currentPage,
  totalPage
}) => {
  const calcX = (unit: number) => {
    const half = Math.ceil(unit / 2)

    if (totalPage <= unit) {
      return 0
    } else {
      if (currentPage > half) {
        return totalPage - currentPage > half
          ? currentPage - half
          : totalPage - unit
      }
    }
    return 0
  }

  const CELL_WIDTH = 35
  const mobileSlUnit = 1
  const mobileLUnit = 3
  const tabletUnit = 5
  const pcUnit = 10

  return (
    <PageWrapper>
      <button className="controller first" onClick={e => handleClickPage(1)}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      <button
        className="controller pre"
        onClick={e => handleClickPage(currentPage - 1)}
      >
        PREV
      </button>

      <NumbersWrapper>
        <NumbersStyle
          tabletX={calcX(tabletUnit) * -CELL_WIDTH}
          tabletMaxWidth={tabletUnit * CELL_WIDTH}
          mobileSX={calcX(mobileSlUnit) * -CELL_WIDTH}
          mobileSMaxWidth={mobileSlUnit * CELL_WIDTH}
          mobileLX={calcX(mobileLUnit) * -CELL_WIDTH}
          mobileLMaxWidth={mobileLUnit * CELL_WIDTH}
          pcMaxWidth={pcUnit * CELL_WIDTH}
          pcX={calcX(pcUnit) * -CELL_WIDTH}
        >
          {totalPage > 1 &&
            new Array(totalPage).fill(0).map((n, index) => (
              <NumberStyle
                className={currentPage === index + 1 ? 'active' : ''}
                key={index}
                onClick={e => handleClickPage(index + 1)}
              >
                {index + 1}
              </NumberStyle>
            ))}
        </NumbersStyle>
      </NumbersWrapper>
      <button
        className="controller next"
        onClick={e => handleClickPage(currentPage + 1)}
      >
        NEXT
      </button>
      <button
        className="controller last"
        onClick={e => handleClickPage(totalPage)}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </PageWrapper>
  )
}
