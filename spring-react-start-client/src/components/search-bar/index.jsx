import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {injectIntl} from 'react-intl'
import classNames from 'classnames'

import Button from '../../components/button'
import FormField from '../form-field'

import {submitSearch} from '../../containers/header/actions'

const SearchBar = ({intl, className, handleSubmit, submitSearch}) => {
    const classes = classNames('c-search-banner u-flexbox', className)
    return (
        <form className={classes} id="searchBarForm" onSubmit={handleSubmit(submitSearch)} noValidate={true}>
            <Button type="submit" className="c--primary u-margin-end-lg" >{intl.formatMessage({id: 'search.button'})}</Button>
            <FormField type="text" placeholder={intl.formatMessage({id: 'search.input.placeholder'})} name="query" label="" />
        </form>
    )
}

SearchBar.propTypes = {
    className: PropTypes.string,
    handleSubmit: PropTypes.func,
    intl: PropTypes.object,
    submitSearch: PropTypes.func
}

const mapDispatchToProps = {
    submitSearch
}

const SearchBarForm = ReduxForm.reduxForm({
    form: 'searchBarForm'
})(SearchBar)

export default injectIntl(connect(undefined, mapDispatchToProps)(SearchBarForm))
