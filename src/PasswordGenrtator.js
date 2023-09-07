import React, { useState } from 'react'
import './password.css';
function PasswordGenrtator() {

    const [password, setPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumber, setIncludeNumber] = useState(true);
    const [includeSymbol, setIncludeSymbol] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [noCheckboxSelected, setNoCheckboxSelected] = useState(false);
    const generatePassword = () => {
        if (!includeUppercase && !includeLowercase && !includeNumber && !includeSymbol) {
            setNoCheckboxSelected(true);
            return;
          } else {
            setNoCheckboxSelected(false);
          }
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_-+=<>?';

        let validChars = '';
        if (includeUppercase) validChars += uppercaseChars;
        if (includeLowercase) validChars += lowercaseChars;
        if (includeNumber) validChars += numberChars;
        if (includeSymbol) validChars += symbolChars;
          console.log(validChars);
        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * validChars.length);
            newPassword += validChars.charAt(randomIndex);
        }

        setPassword(newPassword);
        calculatePasswordStrength(newPassword);
    };

    const calculatePasswordStrength = (password) => {
        const symbolRegex = /[!@#$%^&*()_\-+=<>?]/;

        if (password.length < 7) {
            setPasswordStrength('Weak');
        } else if (password.length >= 7 && password.length < 12) {
            setPasswordStrength('Moderate');
        } else if (password.length >= 12 && symbolRegex.test(password)) {
            setPasswordStrength('Strong');
        }
    };
    const getPasswordStrengthBar = () => {
        if (passwordStrength === 'Weak') {
            return <><span className="weak"></span></>
        } else if (passwordStrength === 'Moderate') {
            return <><span className="weak"></span><span className="moderate"></span></>
        } else if (passwordStrength === 'Strong') {
            return <><span className="weak"></span><span className="moderate"></span><span className="strong"></span></>
        }
        return null;
    };
    return (
        <>
            <div className="Password-box ">
                <div className='password-font common margin-Top24'>
                    <h2 style={{ margin: '0 24px' }}>{noCheckboxSelected ? "Please select atleast one checkbox":password} </h2>
                    {/* <img alt='Image'></img> */}
                </div>
                <div className='charLength common'>
                    <div className='charDisplay'>
                        <label style={{ marginLeft: "24px" }}>character Length: </label>
                        <h3 style={{ marginRight: "24px" }}>{passwordLength}</h3>
                    </div>
                    <input className='stick'
                        type="range"
                        min="6"
                        max="20"
                        value={passwordLength}
                        onChange={(e) => setPasswordLength(e.target.value)}
                    />
                </div>
                <div className='margin-Top24'>
                    <div className='checkbox'>

                        <input
                            type="checkbox"
                            checked={includeUppercase}
                            onChange={() => setIncludeUppercase(!includeUppercase)}
                        />
                        <label>Include Uppercase:</label>
                    </div>
                    <div className='checkbox'>
                        <input
                            type="checkbox"
                            checked={includeLowercase}
                            onChange={() => setIncludeLowercase(!includeLowercase)}
                        />
                        <label>Include Lowercase:</label>
                    </div>
                    <div className='checkbox'>

                        <input
                            type="checkbox"
                            checked={includeNumber}
                            onChange={() => setIncludeNumber(!includeNumber)}
                        />
                        <label>Include Number:</label>
                    </div>
                    <div className='checkbox'>

                        <input
                            type="checkbox"
                            checked={includeSymbol}
                            onChange={() => setIncludeSymbol(!includeSymbol)}
                        />
                        <label>Include Symbol:</label>
                    </div>
                </div>
                <div style={{ marginTop: "24px", width: '90%', height: '3rem', borderRadius: '5px', backgroundColor: '#707070', margin: '0 24px', display: 'flex', justifyContent: 'space-between', textAlign: 'left' }}>
                    <h2 style={{ marginLeft: '5px', paddingTop: '10px' }}> Strength: </h2>
                    <div style={{ fontSize: '12px', marginRight: '4px', paddingTop: '7px' }}>{passwordStrength}
                        <div className="indicator">
                            <span className={`meak strength-bar ${passwordStrength === 'Weak' ? 'red' : passwordStrength ==='Moderate'?'yellow':passwordStrength ==='Strong'?'green':''}`}></span>
                            <span className={`medieum strength-bar ${passwordStrength === 'Weak' ? '' : passwordStrength ==='Moderate'?'yellow':passwordStrength ==='Strong'?'green':''}`}></span>
                            <span className={`strong strength-bar ${passwordStrength === 'Weak' ? '' : passwordStrength ==='Moderate'?'':passwordStrength ==='Strong'?'green':''}`}></span>
                        </div>
                        {getPasswordStrengthBar()}
                    </div>
                </div>

                <button onClick={generatePassword} >Generate Password</button>
                <div>

                </div>

            </div>

        </>
    )
}

export default PasswordGenrtator