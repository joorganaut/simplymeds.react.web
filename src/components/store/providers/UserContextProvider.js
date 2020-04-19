import React, {
    Component
} from 'react'
const MContext = React.createContext(); //exporting context object
class UserContextProvider extends Component {
    constructor() {
        super()
        this.state = {
            message: "",
            User:{}
        }
    }
    render() {
        return (<>
        <MContext.Provider value={
            {
                state: {
                    ...this.state
                },
                actions: {
                    SetUser :(user)=>this.setState({User:user})
                },
            }}>
            {this.props.children}  
            </MContext.Provider>
            </>)
    }
}
export const Consumer = MContext.Consumer
export default UserContextProvider