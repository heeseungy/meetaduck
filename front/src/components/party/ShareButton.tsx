import styles from '@/styles/party/PartyMaker.module.css'

interface PropType {
  children: string;
}

function ShareButton({children}: PropType) {
  return (
    <button className={`FontM ${styles.share}`}>{children}</button>
  )
}

export default ShareButton