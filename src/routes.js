import React from 'react';
import { Route } from 'react-router-dom';
import UserTable from './components/UserTable';
import GroupTable from './components/GroupTable';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={UserTable} />
        <Route exact path='/users/' component={UserTable} />
        <Route exact path='/groups/' component={GroupTable} />
    </div>
);

export default BaseRouter;