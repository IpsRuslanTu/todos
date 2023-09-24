import React from 'react'
import styles from './Header.module.css'

interface HeaderProps {
    title: string
}

const Header = (props: HeaderProps) => {
  return (
    <h1 className={styles.title}>{props.title}</h1>
  )
}

export default Header