import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../utility/colors';

const DetailListItem = ({ icon, title, subtitle }:any) => {
  return (
    <View style={styles.borderContainer}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {icon && (
            <Icon
              name={icon}
              size={24}
              style={{
                color: colors.black,
                marginRight: 20,
              }}
            />
          )}
          <View style={styles.contentContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    borderContainer: {
        paddingLeft: 24,
    },
    wrapper: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 24,
        borderBottomColor: colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        color: colors.blue,
        fontSize: 15,
        marginTop: 4,
    },
});

export default DetailListItem;