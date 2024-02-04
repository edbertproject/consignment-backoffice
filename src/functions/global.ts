import notification, {IconType} from "antd/lib/notification";
import { AxiosError } from "axios";
import _ from "lodash";
import {useLocation} from "react-router-dom";

export const openNotification = (
    type: IconType,
    message: string,
    description?: string
) => {
    notification[type]({
        message: message,
        description: description,
        placement: 'topRight'
    });
};

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export const ordinalSuffixOf = (value: any) => {
    if (!Number(value)) {
        return '';
    }

    const j = parseFloat(value) % 10;
    const k = parseFloat(value) % 100;

    if (j === 1 && k !== 11) {
        return value + 'st';
    }

    if (j === 2 && k !== 12) {
        return value + 'nd';
    }

    if (j === 3 && k !== 13) {
        return value + 'rd';
    }

    return value + 'th';
};

export const mapHookErrors = (errors: any) => {
    let newErrors: any = {};

    Object.keys(errors).forEach(key => {
        Object.assign(newErrors, {
            [key]: {
                message: errors[key][0]
                    .replace(/_id/g, '')
                    .replace(/ id/g, '')
                    .replace(/\.\d{1,3}\./g, (match: string) => {
                        return ` ${match.replace(/\./g, '').replace(/\d{1,3}/g, a => ordinalSuffixOf(parseFloat(a) + 1))} `;
                    })
                    .replace(/\w\.\w/g, (match: string) => match.replace(/\./g, ' '))
                    .replace(/_/g, ' '),
                type: 'manual'
            }
        });
    });

    return newErrors;
};

export const pluckArrayObject = (array: any, props: any) => {
    return _.map(array, o => _.pick(o, props));
}

export const renameObjectOfArrays = (array: any, keyMap: any) => {
    return array.map((obj: any) =>  {
        return _.mapKeys(obj, function(value, key) {
            return keyMap[key];
        });
    });
}

export const getAliasesName = (value: string) => {
    try{
        const arrayName = value.split(' ');
        let aliasesName = value.charAt(0) + value.charAt(1);
    
        if (arrayName.length >= 2) {
            aliasesName = arrayName[0].charAt(0) + arrayName[1].charAt(0);
        }
    
        return aliasesName.toUpperCase();
    } catch(err) {
        return '?'
    }
};

export const toFileList = (data: any[] | any) => {
    if (!data) return []

    if (Array.isArray(data)) {
        return _.map(data, o => {
            return {
                id: o.id,
                name: o.name,
                status: 'done',
                url: o.original_url
            }
        });
    } else {
        return [
            {
                id: data?.id,
                name: data?.name,
                status: 'done',
                url: data?.original_url
            }
        ]
    }
}

export const handleBackendError = (e: AxiosError, msg: string = '') => {
    let err = e.response?.data?.errors
    if(err){
        Object.keys(err).forEach(key => {
            let text = msg;
            if(!err[key] || err[key] === 'Server Error'){
                text = msg
            } else {
                text = err[key]
            }
            openNotification('error', text)
        });
    } else {
        openNotification('error', msg)
    }
}

export const haveAccess = (acl: string[], access: string | string[]): boolean => {
    if(access === 'IGNORE'){
        return true
    }
    if(typeof access === 'string'){
        if(acl.includes(access)){
            return true
        } else {
        return false

        }
    } else {
        let allow = false;
        access.forEach((item: any) => {
            if(acl.includes(item)){
                allow = true;
            }
        })
        return allow
    }
}
