import React, { Component } from 'react';
import {FlatList,Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import {Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state =>{
    return{
        campsites:state.campsites,
        favorites:state.favorites
    };
}

class Favourite extends Component{

    static navigationOptions = {
        title: "My Favourites"
    }
    render(){

        const {navigate} = this.props.navigation;
        const randomFavouriteItem = ({item}) =>{
            return(
                <ListItem  
                        title={item.name}
                        subtitle={item.description}
                        leftAvatar={{source:{uri: baseUrl + item.image}}}
                        onPress={() =>navigate('CampsiteInfo',{campsiteId:item.id})}
                />
            );
        };

            if(this.props.campsites.isLoading){
                return <Loading />;
            }
            if(this.props.campsites.errMess){
                return(
                    <View>
                        <Text>{this.props.campsites.errMess}</Text>
                    </View>
                );
            }
            return(
                <FlatList data={this.props.campsites.campsites.filter(cammpsite => this.props.favorites.includes(cammpsite.id))}
                    renderItem={randomFavouriteItem}
                    keyExtractor={item => item.id.toString()} />
            );
    }
}

export default connect(mapStateToProps)(Favourite);