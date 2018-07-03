/**
 * So if it’s _just_ prop drilling you’re trying to avoid with one or two sets of data, 
 * then context API might be the easiest way to implement. But if the data is being updated 
 * from the connected components, then I like redux better (mostly just because I have the most experience.
 * You can (and should) definitely pass connect around IMO. But rather than 
 * importing connect a million places and creating redundant `mapDispatch` and `mapState` functions, 
 * you can just make container files that are imported into any component that needs them. 
 * So for example, you have a data type that’s like USER data.
 * This file exports an executed function, that returns another function
 */

// in a file called like...userContainer

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    email: state.email,
    favoriteAnimals: state.userFavorites.animals,
    gender: state.gender
})

const mapDispatchToProps = (dispatch) => ({
    // I like using bindActionCreators to bind all necessary actions/thunks
})

export default connect(mapStateToProps, mapDispatchToProps);


// in a component file

import userContainer from '../../some/path/userContainer';

const userProfile = (props) => {
    return (
         <h1>Welcome, {props.email}</h1>
     );
}

export default userContainer(userProfile);
