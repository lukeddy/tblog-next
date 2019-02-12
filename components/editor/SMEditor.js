import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import marked from 'marked';
import highlight from 'highlight.js';
import PropTypes from "prop-types";

class SMEditor extends React.Component{

    state = {
        markdown: '',
        html:'',
    };

    handleChange=(value)=>{
        this.setState({markdown:value})
        this.setState({html:this.markdown2Html(value)})
        this.props.updateMarkdown(value,this.markdown2Html(value))
    };

    markdown2Html=(markdown)=>{
       const html=marked(markdown,{
               renderer: new marked.Renderer(),
                gfm: true,
                pedantic: false,
                sanitize: false,
                tables: true,
                breaks: true,
                smartLists: true,
                smartypants: true,
                highlight: function (code) {
                    //console.log('code',code)
                    return highlight.highlightAuto(code).value;
                }
        });
        return html;
    }


    render(){

      const editorOptions={
              toolbar:this.props.toolbar?this.props.toolbar:[
                  'bold',
                  'italic',
                  'heading',
                  '|',
                  'quote',
                  'code',
                  'table',
                  'horizontal-rule',
                  'unordered-list',
                  'ordered-list',
                  '|',
                  'link',
                  'image',
                  '|',
                  'side-by-side',
                  'fullscreen',
                  '|',
                  {
                      name: 'guide',
                      action () {
                          const win = window.open(
                              'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
                              '_blank',
                          );
                          if (win) {
                              // Browser has allowed it to be opened
                              win.focus();
                          }
                      },
                      className: 'fa fa-info-circle',
                      title: 'Markdown 语法！',
                  },
              ],
            renderer: this.markdown2Html,
        }

        return(
            <SimpleMDE
                onChange={this.handleChange}
                options={editorOptions}
            />
        );
    }
}

SMEditor.propTypes={
    defaultValue:PropTypes.string.isRequired,
    updateMarkdown:PropTypes.func.isRequired,
}

export default SMEditor