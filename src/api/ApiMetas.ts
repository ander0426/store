

export const ApiMetas = async (body:any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    
    const response = await fetch("https://yxth7wmpgeqra7pkmtsvnubrly0qdwvg.lambda-url.us-east-1.on.aws/api/v1/users/get_by_type", requestOptions);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
    
    const result = {
      status: response.status,
      data: data
    }
    
    if (!response.ok) {
        process.env.NODE_ENV === "development" && console.error('There was an error!', result);
    }
    return result
}

export const ApiMetasGuardar = async (body:any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    
    const response = await fetch("https://yxth7wmpgeqra7pkmtsvnubrly0qdwvg.lambda-url.us-east-1.on.aws/api/v1/users/save_goals", requestOptions);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
    
    const result = {
      status: response.status,
      data: data
    }
    
    if (!response.ok) {
        process.env.NODE_ENV === "development" && console.error('There was an error!', result);
    }
    return result
}

export const ApiMetasConsulUser = async () => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    
    const response = await fetch("https://yxth7wmpgeqra7pkmtsvnubrly0qdwvg.lambda-url.us-east-1.on.aws/api/v1/users/get_all", requestOptions);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
    
    const result = {
      status: response.status,
      data: data
    }
    
    if (!response.ok) {
        process.env.NODE_ENV === "development" && console.error('There was an error!', result);
    }
    return result
}

export const ApiMetasConsulUserMes = async (body: any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    
    const response = await fetch("https://yxth7wmpgeqra7pkmtsvnubrly0qdwvg.lambda-url.us-east-1.on.aws/api/v1/users/total_sales", requestOptions);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
    
    const result = {
      status: response.status,
      data: data
    }
    
    if (!response.ok) {
        process.env.NODE_ENV === "development" && console.error('There was an error!', result);
    }
    return result
}
