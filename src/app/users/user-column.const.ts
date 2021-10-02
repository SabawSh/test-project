import { ColumnItem } from "../@core/types/column.interface";
import { UserInterface } from "../@core/types/user.interface";

export const listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: 'ascend',
      sortFn: (a: UserInterface, b: UserInterface) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      colWidth: '10%'
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: UserInterface, b: UserInterface) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      colWidth: '25%'
    },
    {
      name: 'Email',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: UserInterface, b: UserInterface) => a.email.localeCompare(b.email),
      filterMultiple: true,
      colWidth: '25%'
    },
    {
      name: 'City',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: UserInterface, b: UserInterface) => a.address.city.localeCompare(b.address.city),
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: UserInterface) => list.some(city => item.address.city.indexOf(city) !== -1),
      colWidth: '25%'
    }
  ];