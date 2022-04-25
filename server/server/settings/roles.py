from rolepermissions.roles import AbstractUserRole

class Admin(AbstractUserRole):
    available_permissions = {
        
    }

class Technician(AbstractUserRole):
    available_permissions = {
        
    }

class Company(AbstractUserRole):
    available_permissions = {
        
    }

class Manager(AbstractUserRole):
    available_permissions = {
        
    }

class Inspector(AbstractUserRole):
    available_permissions = {
        
    }

class User(AbstractUserRole):
    available_permissions = {

    }