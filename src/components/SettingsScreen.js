'use strict';
import React, { Component } from 'react';
import { StyleSheet, SectionList, Alert } from 'react-native';
import { Icon, ListItem, Divider } from 'react-native-elements';
import { connect } from 'react-redux';

import {
  setAllegroSortOption,
  setAllegroFilterOption,
  resetToDefaults
} from '../actions/settingsActions';
import colors from './config/colors';


class SettingsScreen extends Component {

  /* NAVIGATION */
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <Icon name={'settings'}
                       iconStyle={{marginRight: 10}}
                       color='transparent' />,
  });

  constructor(props) {
    super(props);

    this.state = {
      allegroFilterOptionsList : [
        {
          name: "offerType",
          title: "Typ oferty",
          getValue: () => this.props.allegroFilterOptions.offerType,
          type: "select",
          availableOptions: [
            "buyNow",
            "auction"
          ],
        },
        {
          name: "description",
          title: "Szukaj również w opisach",
          getValue: () => this.props.allegroFilterOptions.description,
          type: "bool",
        },
        {
          name: "condition",
          title: "Stan",
          getValue: () => this.props.allegroFilterOptions.condition,
          type: "select",
          availableOptions: [
            "new",
            "used"
          ],
        },
        {
          name: "city",
          title: "Szukaj tylko w mieście",
          getValue: () => this.props.allegroFilterOptions.city,
          type: "input_string",
          availableOptions: [],
        },
        {
          name: "minPrice",
          title: "Minimalna cena",
          getValue: () => this.props.allegroFilterOptions.minPrice,
          type: "input_price",
          availableOptions: [],
        },
        {
          name: "minPrice",
          title: "Minimalna cena",
          getValue: () => this.props.allegroFilterOptions.minPrice,
          type: "input_price",
          availableOptions: [],
        },
        {
          name: "skipPromoted",
          title: "Pomijaj promowane podczas ustalania najniższej ceny",
          getValue: () => this.props.allegroFilterOptions.skipPromoted,
          type: "bool",
        },
      ],
      allegroSortOptionsList : [
        {
          name: "sortType",
          title: "Sortuj po:",
          getValue: () => this.props.allegroSortOptions.sortType,
          type: "select",
          availableOptions: [
            "price",
            "priceDelivery",
            "endingTime",
            "startingTime",
            "popularity",
            "name",
            "relevance"
          ],
        },
        {
          name: "sortOrder",
          title: "Kolejność sortowania:",
          getValue: () => this.props.allegroSortOptions.sortOrder,
          type: "select",
          availableOptions: [
            "asc",
            "desc"
          ],
        }
      ],
      baseOptions: [
        {
          name: "resetToDefaults",
          title: "Przywróć ustawienia domyślne",
          getValue: "",
          type: "button",
        }
      ],
    };
  }

  onListItemPress(section, item) {
      switch (item.type) {
        case 'select':
          this.props.navigation.navigate('SettingsSelect', {
            optionName: item.title,
            items: item.availableOptions,
            onSelect: (selected) => {this.setOption(section.id, item.name, selected);}
          });
          break;
        case 'bool':
          this.setOption(section.id, item.name, !item.getValue());
          break;
        case 'button':
          this.setOption(section.id, item.name, null);
          break;
        default:
          break;
      }
  }

  setOption(sectionId, option, value) {
    switch (sectionId) {
      case 0:
        this.props.setAllegroFilterOption(option, value);
        break;
      case 1:
        this.props.setAllegroSortOption(option, value);
        break;
      case 2:
        console.log('alert');
        Alert.alert(
          'Potwierdź',
          'Czy na pewno chcesz przywrócić ustawienia domyślne?',
          [
            {text: 'Anuluj', onPress: () => {}, style: 'cancel'},
            {text: 'Tak', onPress: () => this.props.resetToDefaults()}
          ]
        );
        break;
      default:
        break;
    }
  }

  renderItem = ({item, index, section}) => (
    <ListItem
      title={item.title}
      containerStyle={styles.listItem}
      titleStyle={styles.listItemTitle}
      rightTitle={item.type === 'select'
        ? (item.getValue() || 'brak')
        : null}
      rightTitleStyle={item.type === 'select'
        ? styles.listItemRightTitle
        : null}
      switch={item.type === 'bool'
        ? {value:item.getValue(),
          onTintColor: colors.grey,
          thumbTintColor: 'black',
          onValueChange: () => this.onListItemPress(section, item)}
        : null}
      input={item.type ==='input_price' || item.type === 'input_string'
        ? {placeholder: 'brak',
          inputStyle: styles.inputStyle,
          keyboardType: item.type === 'input_price' ? 'numeric' : 'default',
          value: item.getValue(),
          onTextChanged: (newText) => {this.onListItemPress(section, item)}}
        : null}
      onPress={() => {this.onListItemPress(section, item)}}
    />
  );

  renderSectionHeader = ({section: {title}}) => (
    <ListItem
      title={title}
      titleStyle={styles.sectionHeaderText}
    />
  );

  render() {
    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        SectionSeparatorComponent={() => <Divider />}
        ItemSeparatorComponent={() => <Divider />}
        sections={[
          {id: 0, title: 'Ustawienia filtrowania Allegro', data: this.state.allegroFilterOptionsList},
          {id: 1, title: 'Ustawienia sortowania Allegro', data: this.state.allegroSortOptionsList},
          {id: 2, title: 'Pozostałe', data: this.state.baseOptions},
        ]}
        keyExtractor={(item, index) => item + index}
        extraData={this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  allegroSortOptions: state.settings.allegroSortOptions,
  allegroFilterOptions: state.settings.allegroFilterOptions
});

const mapDispatchToProps = dispatch => ({
  setAllegroSortOption: (option, value) => { dispatch(setAllegroSortOption(option, value)) },
  setAllegroFilterOption: (option, value) => { dispatch(setAllegroFilterOption(option, value)) },
  resetToDefaults: () => { dispatch(resetToDefaults()) },
});

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
  listItemRightTitle: {
    fontSize: 12,
    color: colors.gray,
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  inputStyle: {
    fontSize: 13,
    textAlign: 'right',
    height: 20,
    padding: 0
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
