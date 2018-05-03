/**
 * Importación de componentes
 */
import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDeletesweep from 'material-ui/svg-icons/content/delete-sweep';
import ContentArchive from 'material-ui/svg-icons/content/archive';


/**
 * Grid donde se mostrarán todos los datos de los tareas y un sección para las 
 * acciones eliminar y actualizar
 */
export default class GridTasks extends React.Component {
   
    /**
     * En el props se obtiene los datos mandados por node
     */
    render() {

        var formStyle = {
            display : 'inline-block'
        };

        if (this.props.tasks.length === 0) return <p>No hay tareas disponibles</p>;

        return ( 
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Priority</TableHeaderColumn>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        this.props.tasks.map(function (task){
                            return (
                                <TableRow>
                                    <TableRowColumn>{ task.dataValues.name }</TableRowColumn>
                                    <TableRowColumn>{ task.dataValues.priority }</TableRowColumn>
                                    <TableRowColumn>{ task.dataValues.date }</TableRowColumn>
                                    <TableRowColumn>
                                        <form  name="delete" style={formStyle} method="post" action="/task/delete">
                                            <input name="id" type="text" style= {{display: 'none'}} value={ task.dataValues.id }/>
                                            <FloatingActionButton type="submit" style={{marginRight: 20}}>
                                                <ContentDeletesweep />
                                            </FloatingActionButton>
                                        </form>
                                        <form  name="update" style={formStyle} method="post" action="/task/one">
                                            <input name="id" type="text" style= {{display: 'none'}} value={ task.dataValues.id }/>
                                            <FloatingActionButton type="submit" secondary={true} style={{marginRight: 20}}>
                                                <ContentArchive />
                                            </FloatingActionButton>
                                        </form>
                                    </TableRowColumn>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        );
    }
}