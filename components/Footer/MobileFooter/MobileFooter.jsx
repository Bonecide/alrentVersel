import Image from 'next/image'
import s from '../../../styles/MobileFooter.module.scss'
import { useRouter } from 'next/router';
export default function MobileFooter() {
    const router = useRouter()
    return(
        <div className={s.container}>
            <Image onClick={() => router.push('/')} width={20} height={20} src={'/Home.svg/'} alt='home'/>
            <Image onClick={() => router.push('/liked')} width={20} height={20} src={'/Fav.svg/'} alt='fav'/>
            <div className={s.add}>
            <Image onClick={() => router.push('/addAd')} width={20} height={20} src={'/Plus.svg/'} alt='add'/>
            </div>
            <Image onClick={() => router.push('/me')} width={20} height={20} src={'/User.svg/'} alt='user'/>
            <Image onClick={() => router.push('/messages')} width={20} height={16} src={'/Mail.svg/'} alt='mail'/>
        </div>
    )
}