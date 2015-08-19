# -*- coding: utf-8 -*-
__author__ = 'mrodriguez'

import logging
from logging import FileHandler

DEBUG = logging.DEBUG
INFO = logging.INFO
ERROR = logging.ERROR


'''
def get_logger(module_name='carsportal', level=DEBUG):
    logger = logging.getLogger(module_name)
    if len(logger.handlers) == 0:
        logger.setLevel(level)
        syslog = SysLogHandler(address='/dev/log')
        log_format = ('%(asctime)s[carsportal:%(name)s]' +
                      '[%(levelname)s] %(message)s')
        formatter = logging.Formatter(log_format, "%Y-%m-%d %H:%M:%S")
        syslog.setFormatter(formatter)
        logger.addHandler(syslog)
    return logger
'''

def get_logger(module_name='carsportal', level=DEBUG):
    logger = logging.getLogger(module_name)
    if len(logger.handlers) == 0:
        logger.setLevel(level)
        syslog = FileHandler('/var/log/carsportal/carsportal.log', mode='a', encoding=None, delay=False)
        log_format = ('%(asctime)s[carsportal:%(name)s]' +
                      '[%(levelname)s] %(message)s')
        formatter = logging.Formatter(log_format, "%Y-%m-%d %H:%M:%S")
        syslog.setFormatter(formatter)
        logger.addHandler(syslog)
    return logger