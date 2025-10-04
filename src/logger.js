import { createLogger,format,transports } from "winston";
const logger=createLogger({
    levels:{
        error:0,
        warn:1,
        info:2,
        http:3,
        verbose:4,
        debug:5,
        silly:6,
    },
    level:'info',
    format:format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({stack:true}),
        format.json(),
        format.splat(),
        format.printf(({timestamp,level,message})=>{
        return `[${timestamp}] ${level}  :   ${message}`;
        })
    ),
    transports:[
        new transports.File({filename:'devumble-error.log',level:'error'}),
        new transports.File({filename:'devumble-combined.log'}),
        new transports.Console({
      format: format.combine(
        format.colorize(
            {all:true,}
        ),
        format.printf(({ timestamp, level, message, ...meta }) => {
          const msg = typeof message === "object" ? JSON.stringify(message) : message;
          return `[${timestamp}] ${level}: ${msg}`;
        })
      ),
    })
    ]

});
export default logger;


