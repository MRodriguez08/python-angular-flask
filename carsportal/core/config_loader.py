'''
'''

import os
import ConfigParser

def get_config(file=None):    
    if file is None:
        raise Exception('config file cannot be empty') 
    if os.path.isfile(file):
        raise Exception('config file not found')     
    config = ConfigParser.SafeConfigParser()
    config.read(file)
    return config