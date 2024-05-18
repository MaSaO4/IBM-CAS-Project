import userService from "../services/user.service.js";

const isEmployee = async (req, res, next) => {
    console.log('middleware')
    let resp;
    try {
        if (req.params && req.params.id) {
            resp = await userService.getUserById(req.params.id);
            if (!resp) {
                if(req.body && req.body.creator){
                    resp = await userService.getUserById(req.body.creator);
                }
                else{
                    return res.status(404).json({ message: 'User not found' });
                }
        }
    }
        else {
            resp = req.body;
        }
    } catch (error) {
        return res.status(500).json({ message: 'User not found' });
    }

if (resp && resp.role === 'Employee') {
    next();
} else {
    res.status(403).json({ message: 'Unauthorized: Admin access required' });
};
}

const isCitizen = async (req, res, next) => {
    console.log('middleware')
    let resp;
    try {
        console.log("===",req.body.creator)
        if(req.body && req.body.creator){
            resp = await userService.getUserById(req.body.creator);
            if (!resp) {
                return res.status(404).json({ message: 'User not found' });
            }
        }
        else if (req.params && req.params.id) {
            resp = await userService.getUserById(req.params.id);
            if (!resp) {
                return res.status(404).json({ message: 'User not found' });
            }
        }
        else {
            resp = req.body;
        }
    } catch (error) {
        return res.status(500).json({ message: 'User not found' });
    }

    if (resp && resp.role === 'Citizen') {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized: Citizen access required' });
    }
};

const isCitizenOrEmployee = async (req, res, next) => {
    console.log('middleware')
    let resp;
    try {
        if (req.params && req.params.id) {
            resp = await userService.getUserById(req.params.id);
            if (!resp) {
                if(req.body && req.body.creator){
                    resp = await userService.getUserById(req.body.creator);
                }
                else{
                    return res.status(404).json({ message: 'User not found' });
                }
        }
    }
        else {
            resp = req.body;
        }
    } catch (error) {
        return res.status(500).json({ message: 'User not found' });
    }

    if ((resp && resp.role === 'Citizen') || (resp && resp.role === 'Employee')) {
        next(); // User is either a citizen or an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Unauthorized: Citizen or Admin access required' });
    }
};

export { isEmployee, isCitizen, isCitizenOrEmployee };
