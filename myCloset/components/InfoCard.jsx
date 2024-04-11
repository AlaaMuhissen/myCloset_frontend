import React from 'react'
import { View  , Text} from 'react-native'

const InfoCard = () => {
  return (
    <View style= {{
        backgroundColor: '#242424',
        padding: 20,
       
        borderRadius: 6,
      
        gap: 10,
        shadowColor: '#fff',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }}>
      <Text style={{fontSize: 18, fontWeight: 'bold' , color:"#fff"}} >3 outfits planned this week!</Text>
      <Text style={{fontSize: 14,  color:"#fff"}} >75% of your outfit goals achieved</Text>
    </View>
  )
}

export default InfoCard