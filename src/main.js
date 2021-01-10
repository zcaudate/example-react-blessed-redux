import { combineReducers, createStore, bindActionCreators } from "redux";
import React, { useState } from "react";
import blessed from "blessed";
import { render } from "react-blessed";
import { connect, Provider } from "react-redux";

const RST = "ACTION/RST";

const RESET = "ACTION/RESET";

const INC = "ACTION/INC";

const DEC = "ACTION/DEC";

function counter_reducer(count, action) {
  if (count === undefined) {
    return 0;
  }
  console.log("COUNT", count);
  if (action.type == INC) {
    return (count + 1) % 10;
  } else if (action.type == DEC) {
    return (count + 9) % 10;
  } else if (action.type == RESET) {
    return 0;
  } else {
    return count;
  }
}

const main_reducer = combineReducers({ counter: counter_reducer });

function Screen() {
  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: "Tui Counter Basic",
  });
  screen.key(["q", "C-c", "Esc"], function () {
    this.destroy();
  });
  return screen;
}

function action_reset() {
  console.log("RESET");
  return { type: RESET };
}

function action_inc() {
  console.log("INC");
  return { type: INC };
}

function action_dec() {
  console.log("DEC");
  return { type: DEC };
}

function Counter({ doDec, doReset, counter, doInc }) {
  return (
    <box>
      <box
        padding={{ top: 2, right: 5, bottom: 2, left: 5 }}
        width={14}
        height={7}
        border="line"
        content={"" + counter}
      ></box>
      <button
        top={2}
        left={16}
        content="RESET"
        shrink={true}
        onPress={doReset}
        mouse={true}
        padding={{ top: 1, right: 1, bottom: 1, left: 1 }}
        style={{ blink: true, bg: "green", focus: { bold: true } }}
      ></button>
      <box top={8}>
        <button
          left={1}
          content="DEC"
          onPress={doDec}
          shrink={true}
          mouse={true}
          padding={{ top: 1, right: 1, bottom: 1, left: 1 }}
          style={{ fg: "blue", bg: "white", focus: { bold: true } }}
        ></button>
        <button
          left={8}
          content="INC"
          shrink={true}
          onPress={doInc}
          mouse={true}
          padding={{ top: 1, right: 1, bottom: 1, left: 1 }}
          style={{
            blink: true,
            fg: "white",
            bg: "blue",
            focus: { bold: true },
          }}
        ></button>
      </box>
    </box>
  );
}

function AppContainer(props) {
  console.log("CONTAINER", props);
  return (
    <box
      label="Tui Counter Redux"
      border="line"
      style={{ border: { fg: "green" } }}
    >
      <box left={5}>
        <box top={3}>
          <text top={-1} left={1}>
            COUNTER
          </text>
          <Counter
            counter={props.state.counter}
            doDec={props.doDec}
            doInc={props.doInc}
            doReset={props.doReset}
          ></Counter>
        </box>
      </box>
    </box>
  );
}

function mapStateToProps(state) {
  return { state: { ...state } };
}

function mapDispatchToProps(dispatch) {
  console.log("DISPATCH");
  return {
    doInc: function () {
      dispatch(action_inc());
    },
    doDec: function () {
      dispatch(action_dec());
    },
    doReset: function () {
      dispatch(action_reset());
    },
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

function main() {
  const store = createStore(main_reducer, { counter: 0 });
  render(
    <Provider store={store}>
      <App></App>
    </Provider>,
    Screen()
  );
}

main();
