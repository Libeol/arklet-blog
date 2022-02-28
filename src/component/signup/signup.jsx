import { useState } from "react"
import { useHistory, Link } from 'react-router-dom';
import api from "../items/api"
import "./signup.css"
import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Check, LockOutlined } from "@mui/icons-material";

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passCheck, setPassCheck] = useState("")
    const [adminCode, setAdminCode] = useState("")
    const [passErr, setPassErr] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const history = useHistory();


    /*登録ボタンが押されたとき */
    const register = (e) => {
        e.preventDefault()
        setPassErr(false)
        if(adminCode !== "arklet1111"){
            alert("確認コードが間違っています")
            return
        }
        if (password === passCheck) {
            api.post("signupA", {
                username: name,
                email: email,
                password: password,
            }).then((response) => {
                console.log(response.data)
                if (response.data.result) {
                    setIsRegistered(true)
                } else {
                    alert("このメールアドレスは既に登録されています")
                }
            })
        } else {
            setPassErr(true)
        }

    }


    /*ログインページに行く */
    const goLogin = () => {
        history.push("/login")
    }
    const backpage = () => {
        history.goBack()
    }

    return (
        <>
            {
                !isRegistered ?
                    <>
                        < Container component="main" maxWidth="xs" >
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlined />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    新規登録
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Name"
                                                required
                                                fullWidth
                                                id="Name"
                                                label="ユーザーネーム"
                                                autoFocus
                                                onChange={(e) => { setName(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="メールアドレス"
                                                name="email"
                                                autoComplete="email"
                                                onChange={(e) => { setEmail(e.target.value) }}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="パスワード"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => { setPassword(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                error={passErr}
                                                helperText={passErr ? "パスワードが一致しません" : null}
                                                name="password"
                                                label="パスワード(確認)"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => { setPassCheck(e.target.value) }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="adminCode"
                                                label="確認コード"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => { setAdminCode(e.target.value) }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        onClick={register}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        新規登録
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link onClick={backpage} variant="body2">
                                                戻る
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/login" variant="body2">
                                                アカウント既に持っている場合はログイン
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container >
                    </ >
                    :
                    <>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <Check />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    新規登録が完了しました。
                                </Typography>
                                <Typography component="h1" variant="body1" sx={{ mt: 2 }}>
                                    ログインしてサービスをお楽しみください。
                                </Typography>
                                <Button
                                    onClick={goLogin}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ログインする
                                </Button>
                            </Box>
                        </Container>
                    </>
            }
        </>
    )
}
export default SignUp