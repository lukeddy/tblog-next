import React from 'react';
import SimpleMDEEditor from 'yt-simplemde-editor';
import marked from 'marked';
import Prism from 'prismjs'; // 这里使用 ~1.14.0 版本，1.15 之后的版本有bug
import 'prismjs/themes/prism-okaidia.css';
// import 'prismjs/themes/prism-dark.css';
import loadLanguages from 'prismjs/components/index';
import PropTypes from "prop-types";

class YTEditor extends React.Component{

    state = {
        value: '',
    };

    componentDidMount(){
        loadLanguages([
            'css',
            'javascript',
            'bash',
            'git',
            'ini',
            'java',
            'json',
            'less',
            'markdown',
            'php',
            'php-extras',
            'python',
            'jsx',
            'tsx',
            'scss',
            'sql',
            'vim',
            'yaml',
        ]);
    }

    renderMarkdown = text => {
        const html = marked(text, { breaks: true });
        if (/language-/.test(html)) {
            const container = document.createElement('div');
            container.innerHTML = html;
            Prism.highlightAllUnder(container);
            return container.innerHTML;
        }
        return html;
    };

    render(){

        const editorProps = {
            value: this.props.defaultValue,
            getMdeInstance: simplemde => {
                this.simplemde = simplemde;
            },
            onChange: (value) => {
                this.setState({ value })
                this.props.updateMarkdown(value,this.renderMarkdown(value));
            },
            options: {
                // see https://github.com/sparksuite/simplemde-markdown-editor#configuration
                spellChecker: false,
                forceSync: true,
                autosave: {
                    enabled: false,
                    delay: 5000,
                    uniqueId: 'article_content',
                },
                renderingConfig: {
                    // codeSyntaxHighlighting: true,
                },
                previewRender: this.renderMarkdown, // 自定义预览渲染
                tabSize: 4,
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
            },
            //TODO 拖拽上传图片有问题，需要更改
            uploadOptions: {
                uploadUrl: process.env.REACT_APP_API_URL+'/upload/file',
                jsonFieldName: 'data.filename',
                extraHeaders: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': this.props.token,
                },
            },
        };

        return(
            <div>
                <SimpleMDEEditor {...editorProps} />
            </div>
        );
    }
}


YTEditor.propTypes={
    defaultValue:PropTypes.string.isRequired,
    authToken:PropTypes.string.isRequired,
    updateMarkdown:PropTypes.func.isRequired,
}

export default YTEditor