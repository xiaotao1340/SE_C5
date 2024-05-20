import router from '../router'

export default{
    state:{
        name:window.sessionStorage.getItem('name')?window.sessionStorage.getItem('name'):null,
        email:window.sessionStorage.getItem('email')?window.sessionStorage.getItem('email'):null,
        token:window.sessionStorage.getItem('token')?window.sessionStorage.getItem('token'):null,
    },
    mutations:{
        setToken(state, token){
            sessionStorage.setItem("token",token)
            state.token=token
        },
        setEmail(state, email){
            sessionStorage.setItem("email",email)
            state.email=email
        },
        setUser(state, name){
            sessionStorage.setItem("name",name)
            state.name=name
        },
        logout(state){
            state.name=null
            state.token=null
            state.email=null
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("name")
            sessionStorage.removeItem("email")
            router.push({
                name: "Itro"
            })
        }
    },
}