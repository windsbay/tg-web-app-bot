const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.NUMERIC,
        primaryKey: true,
        unique: true
    },
    referer: {
        type: DataTypes.NUMERIC,
        allowNull: true
    },
    balance: {
        type: DataTypes.NUMERIC,
        defaultValue: 0
    }
}, {
    /*hooks: {
        afterCreate: async (user, options) => {
            const check = await UserRewards.findByPk(user.user_id);
            console.log(check);
            if (check !== null) {
                await UserRewards.create({user_id: user.user_id});

            }

        }
    }*/
    //timestamps: false,
});

User.associate = (models) => {
    User.hasMany(models.User, { as: 'Referrals', foreignKey: 'referer' });
};



const TaskType = sequelize.define('taskType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const SocialNetwork = sequelize.define('social_network', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Task = sequelize.define('task', {
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    link: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    reward: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    correct_answer: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    taskTypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: TaskType,
            key: 'id'
        }
    },
    socialNetworkId: {
        type: DataTypes.INTEGER,
        references: {
            model: SocialNetwork,
            key: 'id'
        }
    }
});



const UserTask = sequelize.define('userTask', {
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT
    }
});



User.hasMany(UserTask)
Task.hasMany(UserTask)

UserTask.belongsTo(User)
UserTask.belongsTo(User)

Task.belongsTo(TaskType);
TaskType.hasMany(Task);


const UserRewards = sequelize.define('userRewards', {
    user_id: {
        type: DataTypes.NUMERIC,
        primaryKey: true,
        unique: true,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    balance: {
        type: DataTypes.NUMERIC,
        defaultValue: 0
    }
}, {
    timestamps: false
});

module.exports =  {
    User,
    UserTask,
    Task,
    TaskType,
    SocialNetwork,
    UserRewards
}
