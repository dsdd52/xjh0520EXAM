import React, { Component } from 'react'
import { Text, View ,FlatList, Button, TouchableHighlight,Image, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
class Next extends Component{
  render(){
    return(
        <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
            <Image style={{width:180,height:180}} source={{uri:this.props.route.img}}/>
            <Text>歌曲名称:{this.props.route.name}</Text>
            <Text>歌手:{this.props.route.singer}</Text>
        </View>
    )
}
}

class Home extends React.Component {
  constructor(props){
    super(props)
    this.max=4
    this.state={data:[],albums:[]}
}

componentDidMount(){
    fetch("http://www.cjlly.com:3041/record",{method:"GET"})
    .then(resp=>resp.json())
    .then(albums=>{
        this.setState({albums:albums})
    })
}
_goDetails= () => {
  
  this.props.navigation.navigate('Next')
}
_del=id=>{
  let data=this.state.albums.splice(0)
  let index=data.findIndex(album=>album.id===id)
  data.splice(index,1)
  this.setState({albums:data})
}

_renderItem=({item})=>{
    return (
      <TouchableHighlight onPress={()=>this._goDetails(item)} underlayColor='white'>
        <View style={style.container}>
            <View style={style.Lone}>
              <Text style={{color:'red',fontSize:20}}>{item.id}</Text>
            </View>
            <View>
              <Image style={style.Ltwo} source={{uri:item.img}} />
            </View>
            <View style={style.Rthree}>
              <Text style={style.Rthree}>{item.name}</Text>
            </View>  
            <View style={style.Rfour}>
            <Button  onPress={()=>this._del(item.id)} title="删除"/>
            </View>
        </View>
          </TouchableHighlight>
    )
}

_ItemSeparatorComponent=()=>{
  return <View style={{height:1,backgroundColor:"gray"}}></View>
}
_refresh=()=>{
    let d=Math.floor(Math.random()*100+100)
    let data=this.state.data.splice(0)
    data.unshift(d)
    this.setState({data:data})
}
_reachEnd=()=>{
    let data=this.state.data.splice(0)
    data.push(++this.max)
    this.setState({data:data})
}
  render() {
    return (
      <View>
      <FlatList
          keyExtractor={({item,index})=>index}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          data={this.state.albums} 
          renderItem={this._renderItem}
          refreshing={false}
          onRefresh={this._refresh}
          onEndReached={this._reachEnd}
          onEndReachedThreshold={0.2}
      />
      </View>
    )
  }
}

export default class App extends Component {

  componentDidMount(){
    console.disableYellowBox = true;
  }

    render() {
        return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="熊嘉豪" component={Home}/>
                <Stack.Screen name="详情" component={Next}/>
               
              </Stack.Navigator>
            </NavigationContainer>

        )
    }
    
}

const style = StyleSheet.create({
    container:{
      flexDirection:"row",
      margin:3,
      width:'100%'
    },
    Lone:{
      width:35,
      height:70,
      flexDirection:'row'
    },
    Ltwo:{
      flexDirection:'column',
      width:80,
      height:80
    },
    Rthree:{
      flexDirection:'row',
      width:'60%',
      height:80,
      justifyContent:'center',
    
    },
    Rfour:{
      alignSelf:'center',
      height:30,
      flexDirection:'row-reverse'
    }
})