import { useHistory } from "react-router-dom"

function TopANotLogin(){
    const history = useHistory()
    return(
        <>
        <p>このページにアクセスするためにはログインが必要です</p>
        <button onClick={()=>{history.push("/signup")}}>管理者登録</button>
        <button onClick={()=>{history.push("/login")}}>管理者ログイン</button>
        </>
    )
}
export default TopANotLogin