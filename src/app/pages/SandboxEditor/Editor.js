/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { values } from 'lodash';
import styled from 'styled-components';
import 'normalize.css';

import CodeEditor from '../../components/CodeEditor';
import Preview from '../../components/Preview';
import moduleEntity from '../../store/entities/modules/';
import { modulesSelector, singleModuleSelector } from '../../store/entities/modules/selector';

import type { Module } from '../../store/entities/modules';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.background2};
`;

const CodeEditorContainer = styled.div`
  width: 50%;
`;

const PreviewContainer = styled.div`
  position: relative;
  margin: 8px;
  width: 50%;
  z-index: 20;

  box-shadow: -4px 8px 8px rgba(0, 0, 0, 0.4);
`;

type Props = {
  modules: Array<Module>;
  module: Module;
  moduleId: string;
  changeCode: typeof moduleEntity.actions.changeCode;
};

const mapStateToProps = (state, props: Props) => ({
  modules: values(modulesSelector(state)),
  module: singleModuleSelector(state, { id: props.moduleId }),
});
const mapDispatchToProps = dispatch => bindActionCreators(moduleEntity.actions, dispatch);
class Editor extends React.Component {
  props: Props;
  onChange = (code: string = '') => {
    if (this.props.module.code !== code) {
      this.props.changeCode(this.props.moduleId, code);
    }
  };

  componentDidMount() {
    console.log('hoi');
    this.props.getById('d451fa28-b44c-11e6-80f5-76304dec7eb7');
  }

  render() {
    const { module, modules } = this.props;
    return (
      <Container>
        <CodeEditorContainer>
          <CodeEditor onChange={this.onChange} code={module.code} />
        </CodeEditorContainer>
        <PreviewContainer>
          <Preview
            module={module}
            modules={modules}
          />
        </PreviewContainer>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
