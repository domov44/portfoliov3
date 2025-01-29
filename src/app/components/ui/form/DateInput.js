import React, { useState } from 'react';
import styled from 'styled-components';
import { CiTrash } from 'react-icons/ci';

const DateInputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: solid 1px;
  border-color: ${(props) => (props.$error ? 'var(--error-color) !important' : props.$variant === 'blue' ? 'var(--paragraph)' : props.$variant === 'green' ? 'var(--main-color)' : props.$variant === 'white' ? 'var(--bg-color)' : 'var(--paragraph)')};
  color: ${(props) => (props.$variant === 'blue' ? 'var(--paragraph)' : props.$variant === 'green' ? 'var(--main-color)' : props.$variant === 'white' ? 'var(--bg-color)' : 'var(--paragraph)')};
  padding: 10px 14px;
  padding-right: 40px;
  font-size: 20px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:focus {
    border-color: var(--main-color);
    color: var(--main-color);
    outline: none;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    color: ${(props) => (props.$error ? 'var(--error-color)' : 'var(--main-color)')};
    transform: translateY(-22px);
    font-size: 0.75rem;
    font-weight: 600;
    background-color: var(--secondary-bg-color);
    opacity: 1;
  }

  &:not(:focus) + label {
    color: var(--color-title);
  }
`;

const Label = styled.label`
  position: absolute;
  line-height: 1;
  left: 9px;
  padding: 0px 5px;
  font-size: 16px;
  color: ${(props) => (props.$error ? 'var(--error-color) !important' : 'var(--color-title)')};
  pointer-events: none;
  transition: 0.2s ease-in-out;
  opacity: 0.7;
`;

const ClearButton = styled.button`
  line-height: 0;
  color: var(--error-color);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 50%;
  background: transparent;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  font-size: 20px;
  transition: 0.3s;

  &:hover{
    background: var(--error-bg);
  }
`;

const DateInput = ({ label, type, variant, className, id, onClick, children, maxLength, value, onChange, ...restProps }) => {
  const [error, setError] = useState('');

  const handleChange = (event) => {
    let { value } = event.target;

    // Nettoyer la saisie pour ne garder que les chiffres
    value = value.replace(/\D/g, '');

    // Limiter la longueur de la chaîne de caractères à 8 caractères
    value = value.slice(0, 8);

    // Extraire le jour, le mois et l'année de la valeur
    const day = parseInt(value.slice(0, 2), 10);
    const month = parseInt(value.slice(2, 4), 10);
    const year = parseInt(value.slice(4, 8), 10);

    // Vérifier si le jour, le mois et l'année sont valides
    const isValidDay = day >= 1 && day <= 31;
    const isValidMonth = month >= 1 && month <= 12;
    const isValidYear = year >= 1950; // Année minimale

    // Vérifier si le jour est valide en fonction du mois
    const maxDays = {
      '01': 31,
      '02': year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
      '03': 31,
      '04': 30,
      '05': 31,
      '06': 30,
      '07': 31,
      '08': 31,
      '09': 30,
      '10': 31,
      '11': 30,
      '12': 31,
    };
    const isValidDayInMonth = isValidMonth ? (day >= 1 && day <= maxDays[month.toString()]) : true;


    if (month === 2 && day === 29) {
      if (value.length === 8 && !(month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
        return;
      }
    }

    if (!(isValidDay && isValidMonth && isValidYear && isValidDayInMonth)) {
      // Si le premier chiffre du jour est supérieur à 3, ou s'il est 3 et que le deuxième chiffre est supérieur à 1, ne pas mettre à jour la valeur
      if (value[0] > '3' || (value[0] === '3' && value[1] > '1')) {
        return;
      }

      // Si le premier chiffre du jour est égal 0, et que le second aussi, on bloque
      if (value[0] === '0' && (value[1] === '0')) {
        return;
      }

      // Si le premier chiffre du mois est supérieur à 1, ne pas mettre à jour la valeur
      if (value[2] > '1') {
        return;
      }
      // Si le premier chiffre du mois est 0, le deuxième chiffre doit être différent de 0 pour rester cohérent
      if (value[2] === '0' && value[3] === '0') {
        return;
      }
      // Si le premier chiffre du mois est 1, le deuxième chiffre doit être supérieur à 2 pour rester cohérent
      if (value[2] === '1' && value[3] > '2') {
        return;
      }

      // Si le premier chiffre du mois est 1, le deuxième chiffre doit être supérieur à 2 pour rester cohérent
      if (value[0] === '3' && value[1] === '1' && value[2] === '0' && value[3] === '2') {
        return;
      }

      // Si le premier chiffre du mois est 1, le deuxième chiffre doit être supérieur à 2 pour rester cohérent
      if (value[0] === '3' && value[1] === '0' && value[2] === '0' && value[3] === '2') {
        return;
      }

      // Si le premier chiffre de l'année est inférieur à 1 ou supérieur à 2 on bloque
      if (value[4] < '1' || value[4] > '2') {
        return;
      }

      // Si le premier chiffre de l'année est inférieur égal à 2 et que le le second est supérieur à 0 on bloque
      if (value[4] === '2' && value[5] > '0') {
        return;
      }

      // Si le premier chiffre de l'année est inférieur égal à 1 et que le le second est inférieur à 9 on bloque
      if (value[4] === '1' && value[5] < '9') {
        return;
      }
    }

    // Formater la valeur pour l'affichage
    let formattedValue = value.replace(/^(\d{2})\/?(\d{2})?(\d{0,4})?$/, (match, p1, p2, p3) => {
      let result = '';

      if (p1) result += p1 + '/';
      if (p2) result += p2 + '/';
      if (p3) result += p3;

      return result;
    });

    // Mettre à jour la valeur avec le format correct
    onChange && onChange({ target: { value: formattedValue } });
  };


  const handleClear = () => {
    onChange && onChange({ target: { value: '' } });
  };

  return (
    <DateInputContainer>
      <Input
        {...restProps}
        type={type}
        $variant={variant}
        className={className}
        id={id}
        onClick={onClick}
        placeholder=" "
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        $error={!!error}
      />
      <Label $error={!!error}>{label}</Label>
      {value && (
        <ClearButton type="button" onClick={handleClear}>
          <CiTrash />
        </ClearButton>
      )}
    </DateInputContainer>
  );
};

export default DateInput;
