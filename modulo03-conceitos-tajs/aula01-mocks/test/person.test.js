import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person.js'


describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw if the name is not present', () => {
      // mock é a entrada necessaria para que o teste funcione
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-00'
      }

      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('name is required'))
    })
  })

  describe('#validate', () => {
    it('should throw if the cpf is not present', () => {
      // mock é a entrada necessaria para que o teste funcione
      const mockInvalidPerson = {
        name: 'Teste',
        cpf: ''
      }

      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('cpf is required'))
    })

    describe('#validate', () => {
      it('should not throw person is valid', () => {
        // mock é a entrada necessaria para que o teste funcione
        const mockInvalidPerson = {
          name: 'Teste',
          cpf: '123.456.789-00'
        }

        expect(() => Person.validate(mockInvalidPerson))
          .not
          .toThrow()
      })
    })
  })

  describe('#format', () => {
    // parte do principio que os dados ja foram validados!
    it('shoud format the person name and CPF', () => {
      // AAA

      // Arrange = Prepara
      const mockPerson = {
        name: 'Alex Donizete',
        cpf: '000.999.444-11'
      }

      // Act = Executar
      const formattedPerson = Person.format(mockPerson)

      // Assert = Validar
      const expected = {
        name: 'Alex',
        cpf: '00099944411',
        lastName: 'Donizete'
      }

      expect(formattedPerson).toStrictEqual(expected)
    })
  })

  describe('#save', () => {
    it('should throw a error if propets is not valid', () => {
      const mockPropsPerson = ['cpf', 'name', 'lastName'];
      const randomProps = [];

      while (randomProps.length < 2) {
        const randomIndex = Math.floor(Math.random() * mockPropsPerson.length);
        const selectedProp = mockPropsPerson[randomIndex];

        if (!randomProps.includes(selectedProp)) {
          randomProps.push(selectedProp)
        }
      }

      const randomMockPerson = {}

      for (const prop of randomProps) {
        randomMockPerson[prop] = ''
      }

      expect(() => Person.save(randomMockPerson))
        .toThrow(new Error(`cannot save invalid person: ${JSON.stringify(randomMockPerson)}`))

    })
  })

  describe('#process', () => {
    it('should process a valid person', () => {
      // Uma outra ideia é não retestar o que já foi testado

      // lembra dos checkpoints?
      // Testou do caminho A ao caminho B,
      //      agora testa do caminho B ao caminho C
      // Então aqui, eu pulo o caminho A (validate), caminho B (format)
      // e vou direto para o caminho C (save) pois estes caminhos
      // ja foram validados

      // Este método abaixo faz mais sentido para quando se tem interações externas como
      // chamadas de API, bancos de dados, etc (que será mostrado na próxima aula)

      // Mocks são simulações de funções que você pode fazer ao testar o comportamento!!

      /// AAA = Arrange, Act, Assert

      // Arrange
      const mockPerson = {
        name: 'Alex Gonçalves',
        cpf: '123.456.789-00'
      }

      jest.spyOn(
        Person,
        Person.validate.name
      ).mockReturnValue()

      jest.spyOn(
        Person,
        Person.format.name
      ).mockReturnValue({
        cpf: '12345678900',
        name: 'Alex',
        lastName: 'Gonçalves'
      })

      jest.spyOn(
        Person,
        Person.save.name
      ).mockReturnValue()

      // Act
      const result = Person.process(mockPerson)

      // Assert
      const expected = 'ok'
      expect(result).toStrictEqual(expected)
    })
  })
})