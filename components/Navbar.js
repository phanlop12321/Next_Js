import  Link  from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
    const router = useRouter()

    const hello = () => {
        //alert('good evening')
        //เปลี่ยนหน้า
        const action = confirm('ไปต่อหรือถอยดี')
        if (action){
            router.push('/login')
        } else {
            router.back()
        }
        

    }

    return (
        <nav className=" bg-black text-white p-4 flex flex-row gap-5 fixed left-0 right-0">
         <div>
            <Link href="/">Home</Link>
         </div>
         <div>
            <Link href="/login">Login</Link>
         </div>
         <button 
         className=' bg-red-500 p-2 rounded-lg'
         onClick={hello}>
button
         </button>
        </nav>
    )
}