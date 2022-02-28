import { useState } from "react"
import { Link, useHistory } from 'react-router-dom';
import api from "../items/api"
import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LockOutlined } from "@mui/icons-material";
api.defaults.withCredentials = true

function Login(props) {
    const { login } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)

    const history = useHistory();

    /*ログイン欄とパスワード欄が入力されたとき */
    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passChange = (e) => {
        setPassword(e.target.value)
    }

    /*ログインボタンが押された時 */
    const decideLogin = () => {
        setEmailError(false)
        setPassError(false)
        api.post("loginA", {
            email: email,
            password: password
        }, { withCredentials: true }).then(async(response) => {
            if (response.data.isLoggedIn) {
                login(response.data.id)
                history.push("/admin")
            } else {
                if (response.data.errorMsg === "email") {
                    setEmailError(true)
                } else {
                    setPassError(true)
                }
            }
        })
    }

    /*ホームに戻る */
    const backpage = (e) => {
        e.preventDefault();
        history.goBack()
    }

    return (
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
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ログイン
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>

                        <TextField
                            error={emailError}
                            helperText={emailError ? "このメールアドレスは登録されていません" : null}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="メールアドレス"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={emailChange}
                        />

                        <TextField
                            error={passError}
                            helperText={passError ? "パスワードが間違っています" : null}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="パスワード"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passChange}
                        />
                        <Button
                            color="primary"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={decideLogin}
                        >
                            ログイン
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link onClick={backpage} variant="body2">
                                    戻る
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    アカウントをお持ちでない場合は登録
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}
export default Login