__author__ = 'gpacheco'

from carsportal import db
from sqlalchemy import or_


class BaseService(object):
    __model__ = None

    __id_attr__ = 'id'

    def _find(self, **kwargs):
        return self.__model__.query.filter_by(**kwargs)

    def all(self):
        return self.__model__.query.all()

    #GET (start, limit)
    def get_collection(self, start=0, limit=None,
                       order=True, order_by=None,
                       like_cols=None, like_value=None,
                       returnQry=False, fields=None):
        """
        :param start: indicating an offset and the maximum amount of elements
        to retrieve.
        :param limit: indicating an offset and the maximum amount of elements
        to retrieve.
        :param order: kind of order, 'asc' or 'dsc'.
        :param order_by: a column to order by
        :param like_cols:[str] indicating which columns will be filtered
        by *like_value*. If like_value is None, it is ignored.
        :param like_value: a value to filter columns by
        :param returnQry: to return the query without executing it
        :param fields: fields to return in case of execution

        :return: A SQLAlchemy Query or
                 A dict with two keys,
                    * recordsTotal: Total items in full collection.
                    * data: Records between collection[start] and
                    collection[start + limit], with the filters applied.

        To get a column like value expression:
        like_expr = self.__model__.__table__.columns[<key>].like(<value>)
        Qry.filter(like_expr)

        To order the values by a column name:
        Qry.order_by(
            self.__model__.__table__.columns[<col>]         (asc)
            self.__model__.__table__.columns[<col>].desc()  (desc)
        )
        """
        query = self.__model__.query

        # An array to get a reference to the cols
        columns = self.__model__.__table__.columns
        # Filter by *like_value* in columns *like_cols*:
        if like_value is not None and like_cols is not None:
            like_value = '%' + like_value + '%'
            params = []
            for key in like_cols:
                params.append(columns[key].like(like_value))
            query = query.filter(or_(*params))
        # Order the data:
        if order_by is None:
            order_by = self.__id_attr__
        orderer = columns.get(order_by)
        if orderer is not None:
            if not order:
                orderer = orderer.desc()
            query = query.order_by(orderer)

        count = query.count()

        # Select the data start and length:
        if None not in (start, limit):
            limit = start + limit or count
            query = query.slice(start, limit)

        if returnQry:
            return count, query

        collection = query.all()

        if fields is not None:
            data = {
                "recordsTotal": count,
                "data": [x.to_dict(fields=fields) for x in collection]
            }
        else:
            data = {
                "recordsTotal": count,
                "data": [x.to_dict() for x in collection]
            }

        return data

    #GET (id)
    def get(self, id_value):
        '''
        Returns the model with the id *id*.
        Returns 'None' if it doesn't exist.
        '''
        if self.__id_attr__ == 'id':
            model = self.__model__.query.get(id_value)
        else:
            args = {self.__id_attr__: id_value}
            model = self._find(**args).first()
        return model

    #POST
    def create(self, id_attr, dic):
        raise NotImplementedError('create')

    #PUT
    def update(self, id_attr, dic):
        raise NotImplementedError('update')

    #DELETE
    def delete(self, id_attr):
        model = self.get(id_attr)
        if not model:
            raise LookupError()
        try:
            db.session.delete(model)
            db.session.commit()
        except Exception as ex:
            db.session.rollback()
            raise ex

    @staticmethod
    def save(model):
        '''
        Saves the model into the database.
        Raises:
          ConflictError, etc.
        '''
        try:
            db.session.add(model)
            db.session.commit()
        except Exception as ex:
            db.session.rollback()
            raise ex
        return model

#Compatibility issues:
Service = BaseService
