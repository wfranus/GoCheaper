'use strict';
import React, { Component } from 'react';
import { StyleSheet, SectionList } from 'react-native';
import { Icon, ListItem, Divider } from 'react-native-elements';


class SettingsSelectScreen extends Component {

  /* NAVIGATION */
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <Icon name={'settings'}
                       iconStyle={{marginRight: 10}}
                       color='transparent' />,
  });

  constructor(props) {
    super(props);

    this.state = this.props.navigation.state.params;
    //this.onListItemPress = this.onListItemPress.bind(this);
    //this.renderItem = this.renderItem.bind(this);
  }

  onListItemPress(item) {
    this.props.navigation.goBack(null);
    this.state.onSelect(item);
  }

  renderItem = ({item, index, section}) => (
    <ListItem
      title={item}
      containerStyle={styles.listItem}
      titleStyle={styles.listItemTitle}
      onPress={() => {this.onListItemPress(item)}}
    />
  );

  renderSectionHeader = ({section: {title}}) => (
    <ListItem
      title={title}
      titleStyle={styles.sectionHeaderText}
    />
  );

  render() {
    const {
      optionName,
      items,
    } = this.state;

    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        SectionSeparatorComponent={() => <Divider />}
        ItemSeparatorComponent={() => <Divider />}
        sections={[
          {title: optionName, data: items},
        ]}
        keyExtractor={(item, index) => item + index}
      />
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  listItemTitle: {
    fontSize: 13,
    color: 'black',
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  }
});

export default SettingsSelectScreen;
