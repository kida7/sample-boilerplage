import React, { PureComponent } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class HorizontalView extends PureComponent<ViewProps> {
  render() {
    let { style, ...props } = this.props;
    return <View style={[styles.container, style]} {...props} />;
  }
}

export default HorizontalView;
